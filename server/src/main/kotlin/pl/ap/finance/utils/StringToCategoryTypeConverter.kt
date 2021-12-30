package pl.ap.finance.utils

import org.springframework.core.convert.converter.Converter
import pl.ap.finance.model.CategoryType

class StringToCategoryTypeConverter: Converter<String, CategoryType> {
    override fun convert(source: String): CategoryType {
        return CategoryType.valueOf(source.uppercase())
    }
}