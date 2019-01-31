package ro.unibuc.rankohmeter.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenericListFilterModel {

    private static final Integer PAGE_SIZE_FIVE = 5;
    private static final Integer FIRST_PAGE = 0;
    private static final String SORT_EMPTY = "";

    private Integer page = FIRST_PAGE;
    private Integer size = PAGE_SIZE_FIVE;
    private String sort = SORT_EMPTY;
}
