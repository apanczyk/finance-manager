package pl.ap.finance.model

import javax.persistence.*

@Entity
@Table(name = "category_table")
class Category(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0L,
    val name: String,
    @Enumerated(EnumType.STRING)
    val type: CategoryType
)