package br.com.localizapet.models;

import br.com.localizapet.models.enums.TypeInMap;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
@Document(collection = "markers")
public class Marker {
    @Id
    private String id;

    @NotBlank
    private String ownerId;

    @NotBlank
    private Double lat;

    @NotBlank
    private Double lng;

    @NotBlank
    private TypeInMap type;

    @NotBlank
    private String title;
}
