package ro.unibuc.rankohmeter.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lol {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lol_seq_gen")
    @SequenceGenerator(allocationSize = 1, sequenceName = "lol_seq", name = "lol_seq_gen")
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Long wins;

    @NotNull
    private Long losses;

    @NotNull
    private String division;

    @NotNull
    private Long points;

    @NotNull
    private String mostUsedChamps;

    @NotNull
    private Long kills;

    @NotNull
    private Long deaths;

    @NotNull
    private Long assists;

    @Type(type = "org.hibernate.type.LocalDateTimeType")
    private LocalDateTime createdAt;

    @Type(type = "org.hibernate.type.LocalDateTimeType")
    private LocalDateTime updatedAt;
}