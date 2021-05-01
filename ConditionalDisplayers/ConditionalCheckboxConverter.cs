using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors.ValueConverters;

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
