package br.com.localizapet.payload.response;

import br.com.localizapet.models.enums.TypeInMap;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
public class MarkerResponse {
    private String id;
    private Double lat;
    private Double lng;
    private String ownerId;
    private TypeInMap type;
    private String title;
}
