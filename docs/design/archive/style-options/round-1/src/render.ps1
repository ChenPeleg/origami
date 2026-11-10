# Renders the original five style boards (archived) from board.html to 1600x1000 PNGs.
# The four archived boards go to docs/design/archive/style-options/round-1.
# The chosen Workbench board goes to ../round-2.
# Usage (from repo root): & .\docs\design\archive\style-options\round-1\src\render.ps1
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
$src  = Join-Path $PSScriptRoot 'board.html'
$out  = Split-Path $PSScriptRoot -Parent
$boards = [ordered]@{
  'washi'  = '01-washi-sumi'
  'crease' = '02-crease-pattern'
  'bench'  = '..\round-2\03-workbench'
  'riso'   = '04-riso-fold'
  'kami'   = '05-kami-grid'
}
foreach ($k in $boards.Keys) {
  $png = [IO.Path]::GetFullPath((Join-Path $out ($boards[$k] + '.png')))
  $url = 'file:///' + ($src -replace '\\','/') + '?style=' + $k
  & $edge --headless=new --disable-gpu --hide-scrollbars --window-size=1600,1000 --virtual-time-budget=8000 "--screenshot=$png" $url 2>$null | Out-Null
  Write-Host "rendered $png"
}
