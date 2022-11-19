package br.com.localizapet.payload.request;

import br.com.localizapet.models.enums.TypeInMap;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
public class MarkerRequest {
    @NotNull
    private Double lat;
    @NotNull
    private Double lng;
    @NotNull
    private TypeInMap type;
    @NotBlank
    private String title;
}
