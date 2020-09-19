# Create Nuget package
.\nuget.exe pack -Build ..\src\ConditionalDisplayers.nuspec -Properties Configuration=Release
Write-Host "Nuget package created."

# Create Umbraco package
Unblock-File -Path .\CreateUmbracoPackage.ps1
powershell -File .\CreateUmbracoPackage.ps1 -packageId Our.Umbraco.ConditionalDisplayers -packageDirectory ..\src -buildConfiguration Release
Write-Host "Umbraco package created."