package br.com.localizapet.models;

import br.com.localizapet.models.enums.ERole;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode()
@ToString()
@Document(collection = "roles")
public class Role {
  @Id
  private String id;

  private ERole name;
}
