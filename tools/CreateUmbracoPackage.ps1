param([string] $packageId, [string]$packageDirectory, [string]$buildConfiguration)

$scriptDir = $PSScriptRoot
$targetDirectory =  Join-Path $scriptDir $packageDirectory
$buildConfiguration = "release"

$workingPackageFilePath = Join-Path $targetDirectory "package.xml"

$workingPackageFile = [xml](Get-Content $workingPackageFilePath)

$xpathForFiles = "//file"
$xpathForName = "//info/package/name"
$xpathForVersion = "//info/package/version"

$fileNodes = $workingPackageFile.SelectNodes($xpathForFiles)
$nameNode = $workingPackageFile.SelectSingleNode($xpathForName)
$versionNode = $workingPackageFile.SelectSingleNode($xpathForVersion)

$packageName = $nameNode.InnerText

$filepaths = @($workingPackageFilePath)
$version = ""

foreach ($fileNode in $fileNodes) {
    $nameNode = $fileNode["orgName"]
    $pathNode = $fileNode["orgPath"]
	
    $name = $nameNode.InnerText
    $path = $pathNode.InnerText.Replace("/", "\").Replace("\bin", ("\bin\" + $buildConfiguration))
    $filePath = Join-Path $packageDirectory ($path + "\" + $name)
	
    if ($filePath.Contains($packageId + ".dll") -and [string]::IsNullOrWhiteSpace($versionFilePath)) {
        $fileStream = ([System.IO.FileInfo] (Get-Item $filePath)).OpenRead();
        $assemblyBytes = new-object byte[] $fileStream.Length
        $fileStream.Read($assemblyBytes, 0, $fileStream.Length);
        $fileStream.Close();

        $assemblyLoaded = [System.Reflection.Assembly]::Load($assemblyBytes);
        $version = $assemblyLoaded.GetName().Version
        $semVersion = -join ($version.Major, ".", $version.Minor, ".", $version.Build)
    }

    $filepaths += $filePath
}

$versionNode.InnerText = $semVersion
#$workingPackageFile.Save((Join-Path $packageDirectory "package.xml"))

Compress-Archive -LiteralPath $filepaths -CompressionLevel Optimal -DestinationPath ($packageId + "-" + $semVersion.Replace(".", "") + ".zip") -Update

