using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors.ValueConverters;

namespace Our.Umbraco.ConditionalDisplayers
{
    class ConditionalCheckboxConverter : YesNoValueConverter
    {
        public override bool IsConverter(IPublishedPropertyType propertyType)
        {
            return propertyType.EditorAlias == "Our.Umbraco.CdCheckbox";
        }
    }


}
