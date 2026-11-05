@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Avatar Printer - Stop All
rem Stop every process belonging to this project:
rem   python launch.py (main app / server-only guard)
rem   node douyin-bridge.mjs (data bridge)
rem   cmd guards running run-server-forever.bat / run-bridge-forever.bat
rem   WebView2 live window (remote-debugging-port=9224)
powershell -NoProfile -ExecutionPolicy Bypass -Command "$self=$PID; $procs = Get-CimInstance Win32_Process | Where-Object { $_.ProcessId -ne $self -and $_.CommandLine -match 'douyin-bridge\.mjs|launch\.py|run-server-forever\.bat|run-bridge-forever\.bat|remote-debugging-port=9224' }; if (-not $procs) { Write-Host 'No Avatar Printer processes found.' } else { foreach ($p in $procs) { $cmd = $p.CommandLine; if ($cmd.Length -gt 100) { $cmd = $cmd.Substring(0,100) + '...' }; Write-Host ('Stopping PID ' + $p.ProcessId + ': ' + $cmd); try { Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop } catch { Write-Host ('  failed: ' + $_.Exception.Message) } }; Write-Host 'Done.' }"
echo.
echo All Avatar Printer processes stopped.
pause
