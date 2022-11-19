package br.com.localizapet.payload.response;

import br.com.localizapet.models.enums.Race;
import br.com.localizapet.models.enums.TypeInMap;
import br.com.localizapet.models.enums.PetType;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
public class PetResponse {
    private String id;
    private String userId;
    private String name;
    private PetType type;
    private Race race;
    private String photo;
    private String description;
    private TypeInMap situation;
}
