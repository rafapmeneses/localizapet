package br.com.localizapet.mapper;

import br.com.localizapet.models.Marker;
import br.com.localizapet.payload.request.MarkerRequest;
import br.com.localizapet.payload.response.MarkerResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class MarkerMapper {

    public static Marker toEntity(MarkerRequest request) {
        return Marker.builder()
                .lat(request.getLat())
                .lng(request.getLng())
                .type(request.getType())
                .title(request.getTitle())
                .build();
    }

    public static List<MarkerResponse> toListResponse(List<Marker> markers) {
        return markers.stream().map(MarkerMapper::toResponse).collect(Collectors.toList());
    }

    public static MarkerResponse toResponse(Marker marker) {
        return MarkerResponse.builder()
                .id(marker.getId())
                .ownerId(marker.getOwnerId())
                .lat(marker.getLat())
                .lng(marker.getLng())
                .type(marker.getType())
                .title(marker.getTitle())
                .build();
    }
}
