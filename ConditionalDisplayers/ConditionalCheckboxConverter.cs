#if NET5_0_OR_GREATER
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors.ValueConverters;
#else
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors.ValueConverters;
#endif

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
