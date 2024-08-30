package in.smcoder.cybercode.dto;

import in.smcoder.cybercode.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponseDto {
    private User user;
    private String token;
}
