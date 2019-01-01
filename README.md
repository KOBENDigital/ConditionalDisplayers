# Conditional Displayers

This is an Umbraco package. It implements a checkbox and dropdown datatype editors that work like the core ones (in fact they are based in the same code), but allows to hide or display other properties in the same Document Type.

## Installation

### Nuget
[![NuGet](https://buildstats.info/nuget/Our.Umbraco.ConditionalDisplayers)](https://www.nuget.org/packages/Our.Umbraco.ConditionalDisplayers/)

Run this form your Package Manager Console in Visual Studio:

    PM> Install-Package Our.Umbraco.ConditionalDisplayers

### Umbraco Package

https://our.umbraco.com/packages/backoffice-extensions/conditional-displayers/

### Manually
Download the code and copy it into you App_Plugin folder.

## Configuration

### Checkbox

Create a new DataType and select 'Checkbox Conditional Displayer' as the Property Editor.

-*Default* value: select the value that the checkbox will have by default: checked/unchecked.

-*Show if checked*: enter the aliases of those properties you want to show when the checkbox is checked. Note: these properties <b>will be hidden</b> if it's unchecked.

-*Show if unchecked*: enter the aliases of those properties you want to show when the checkbox is unchecked. Note: these properties <b>will be hidden</b> if it's checked.

### Dropdown

Create a new DataType and select 'Dropdown Conditional Displayer' as the Property Editor.

You'll have to create a list of options that the dropdown will display. In addition to the value you have two other inputs used to show or hide one or more properties.

-*Show if selected*: enter the aliases of those properties you want to show when the checkbox is selected. Note: these properties <b>won't be hidden</b> when this value unselected.
-*Hide if selected*: enter the aliases of those properties you want to show when the checkbox is selected. Note: these properties <b>won't be hidden</b> when this value unselected.

<strong>Note:</strong> the difference of behaviour between the checkbox and the dropdown input logic can be a bit confusing, but after a lot of testing it seems the most flexible way to combine the different possibilities when configuring them. I'm open to other behaviour suggestions.

## Getting the properties values

The Conditional Displayers are normal property editors so you can access their values as with any other property (strongly typed model, GetPropertyValue,...)