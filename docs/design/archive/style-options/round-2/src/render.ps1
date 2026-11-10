# Renders each Workbench variation in workbench.html to a 1600x1000 PNG in docs/design/archive/style-options/round-2.
# Usage (from repo root): & .\docs\design\archive\style-options\round-2\src\render.ps1
# The original five boards are archived: see ../round-1/src.
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
$src  = Join-Path $PSScriptRoot 'workbench.html'
$out  = Split-Path $PSScriptRoot -Parent
$boards = [ordered]@{
  'mat'   = '03a-workbench-cutting-mat'
  'cork'  = '03b-workbench-pinboard'
  'birch' = '03c-workbench-birch-washi'
  'lamp'  = '03d-workbench-lamplight'
}
foreach ($k in $boards.Keys) {
  $png = Join-Path $out ($boards[$k] + '.png')
  $url = 'file:///' + ($src -replace '\\','/') + '?v=' + $k
  & $edge --headless=new --disable-gpu --hide-scrollbars --window-size=1600,1000 --virtual-time-budget=8000 "--screenshot=$png" $url 2>$null | Out-Null
  Write-Host "rendered $png"
}
