package ro.unibuc.rankohmeter.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lol {

    @Id
    private Long id;

    @NotEmpty
    private String name;

    @NotNull
    private Long wins;

    @NotNull
    private Long losses;

    @NotEmpty
    private String division;

    @NotNull
    private Long points;

    @NotEmpty
    private String mostUsedChamps;

    @NotEmpty
    private String kills;

    @NotEmpty
    private String deaths;

    @NotEmpty
    private String assists;

    @NotNull
    private Long playerRank;
}