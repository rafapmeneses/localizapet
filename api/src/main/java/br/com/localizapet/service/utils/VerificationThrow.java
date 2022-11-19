package br.com.localizapet.service.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class VerificationThrow {
    public static void permissionVerification(String id, String userId){
        if(!id.equals(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Sem permissão para realizar essa ação.");
        }
    }

    public static boolean fieldNullAndBlankVerification(String field){
        return field != null && !field.isBlank();
    }

}
