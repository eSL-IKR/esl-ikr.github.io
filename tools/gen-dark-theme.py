#!/usr/bin/env python3
"""Jana src/theme.css (mod gelap) daripada kelas Tailwind yang digunakan dalam src/*.jsx.
Cara guna (dari akar projek):  python3 tools/gen-dark-theme.py
Jalankan semula selepas menambah kelas warna Tailwind baharu. Bahagian tulisan tangan ada dalam tools/theme-base.css."""
import re, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FAMS = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'
NEUTRAL = {'slate', 'gray', 'zinc', 'neutral', 'stone'}
PREFIXES = {'hover': ':hover', 'focus': ':focus', 'focus-within': ':focus-within', 'active': ':active', 'disabled': ':disabled',
            'group-hover': ':is(:where(.group):hover *)'}
BREAK = {'sm': '40rem', 'md': '48rem', 'lg': '64rem', 'xl': '80rem'}

# oklch warna Tailwind daripada theme.css pakej tailwindcss
theme_css = open(os.path.join(ROOT, 'node_modules/tailwindcss/theme.css'), encoding='utf-8').read()
COLORS = dict(re.findall(r'--color-([a-z]+-\d+):\s*(oklch\([^)]*\))', theme_css))

TOKEN = re.compile(r'(?<![\w-])((?:(?:hover|focus|focus-within|active|disabled|group-hover|sm|md|lg|xl):)*)'
                   r'(bg|text|border|from|via|to|divide)-(white|black|' + FAMS + r')(?:-(\d{2,3}))?(?:/(\d{1,3}))?(?![\w\-/])')

tokens = set()
for f in glob.glob(os.path.join(ROOT, 'src', '**', '*.jsx'), recursive=True) + glob.glob(os.path.join(ROOT, 'src', '*.js')):
    for m in TOKEN.finditer(open(f, encoding='utf-8').read()):
        tokens.add(m.groups())

def tint(fam, pct):
    return f'color-mix(in oklab, {COLORS[fam + "-500"]} {pct}%, var(--dk-surface))'

def bg_color(fam, step):
    if fam == 'white': return 'var(--dk-surface)'
    if fam in NEUTRAL:
        return {'50': 'var(--dk-page)', '100': 'var(--dk-raise)', '200': 'var(--dk-line)', '300': 'var(--dk-line-2)'}.get(step)
    return {'50': tint(fam, 9), '100': tint(fam, 15), '200': tint(fam, 22), '300': tint(fam, 32)}.get(step)

def text_color(fam, step):
    if fam in NEUTRAL:
        return {'950': '#f1f5f9', '900': '#e5ebf5', '800': '#e5ebf5', '700': '#cbd5e1', '600': '#b4c0d3', '500': '#9aa8bd'}.get(step)
    if fam in ('white', 'black'): return None
    return {'900': COLORS[fam + '-300'], '800': COLORS[fam + '-300'], '700': COLORS[fam + '-300'],
            '600': COLORS[fam + '-300'], '500': COLORS[fam + '-400']}.get(step)

def border_color(fam, step):
    if fam == 'white': return 'rgba(255,255,255,.12)'
    if fam in NEUTRAL:
        return {'50': 'var(--dk-line)', '100': 'var(--dk-line)', '200': 'var(--dk-line)', '300': 'var(--dk-line-2)'}.get(step)
    return {'50': tint(fam, 20), '100': tint(fam, 24), '200': tint(fam, 30), '300': tint(fam, 40)}.get(step)

def esc(tok):
    return re.sub(r'([:/.])', r'\\\1', tok)

rules = {}  # media -> list[str]
for pre, kind, fam, step, alpha in sorted(tokens, key=lambda t: tuple(x or '' for x in t)):
    if fam == 'black': continue
    if fam == 'white' and step: continue
    if fam == 'white' and alpha and (kind != 'bg' or int(alpha) < 40): continue  # lapisan putih lutsinar pada latar gelap dikekalkan
    if fam != 'white' and not step: continue
    step = step or ''
    if kind in ('bg', 'from', 'via', 'to'): col = bg_color(fam, step)
    elif kind == 'text': col = text_color(fam, step)
    else: col = border_color(fam, step)  # border, divide
    if not col: continue
    if alpha:
        col = f'color-mix(in srgb, {col} {alpha}%, transparent)'
    parts = [p for p in pre.split(':') if p]
    media = None; suffix = ''
    for p in parts:
        if p in BREAK: media = BREAK[p]
        else: suffix += PREFIXES[p]
    cls = '.' + esc(pre + kind + '-' + fam + (f'-{step}' if step else '') + (f'/{alpha}' if alpha else ''))
    if 'group-hover' in parts:
        sel = cls + suffix
    else:
        sel = cls + suffix
    sel = ':where(html[data-theme="dark"]) ' + sel
    if kind == 'bg': decl = f'background-color:{col}'
    elif kind == 'text': decl = f'color:{col}'
    elif kind == 'border': decl = f'border-color:{col}'
    elif kind == 'divide':
        sel = ':where(html[data-theme="dark"]) ' + cls + suffix + ' > :not(:last-child)'
        decl = f'border-color:{col}'
    else: decl = f'--tw-gradient-{kind}:{col}'
    rules.setdefault(media, []).append(f'{sel}{{{decl}}}')

base = open(os.path.join(ROOT, 'tools', 'theme-base.css'), encoding='utf-8').read()
out = [base, '\n/* ---- Dijana oleh tools/gen-dark-theme.py (jangan sunting tangan) ---- */', '@layer utilities {']
for media in [None] + list(BREAK.values()):
    if media not in rules: continue
    body = '\n'.join('  ' + r for r in rules[media])
    out.append(body if media is None else f'  @media (min-width:{media}) {{\n{body}\n  }}')
out.append('}\n')
open(os.path.join(ROOT, 'src', 'theme.css'), 'w', encoding='utf-8').write('\n'.join(out))
print('kelas dipetakan:', sum(len(v) for v in rules.values()), 'daripada', len(tokens), 'token')
