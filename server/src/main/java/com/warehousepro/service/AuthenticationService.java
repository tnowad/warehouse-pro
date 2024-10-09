package com.warehousepro.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.warehousepro.dto.request.LoginRequest;

import com.warehousepro.dto.response.LoginResponse;
import com.warehousepro.entity.User;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public LoginResponse authenticate(LoginRequest loginRequest) throws JOSEException {

        var user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(
                RuntimeException::new);
        boolean authenticated = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if(!authenticated) throw new RuntimeException("Unauthenticated");

        var token = generateToken(user);

        return LoginResponse.builder()
                .token(token)
                .user(userMapper.toUserResponse(user))
                .build();
    }

    private String generateToken(User user) throws JOSEException {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("vinh.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(3000, ChronoUnit.SECONDS).toEpochMilli()))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader ,payload);

        jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));

        return jwsObject.serialize();
    }

}
