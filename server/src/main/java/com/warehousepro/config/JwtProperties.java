package com.warehousepro.config;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtProperties {
  private Access access;
  private Refresh refresh;

  @Setter
  @Getter
  @FieldDefaults(level = AccessLevel.PRIVATE)
  public static class Access {
    private String secret;
    private long expiration;
  }

  @Setter
  @Getter
  @FieldDefaults(level = AccessLevel.PRIVATE)
  public static class Refresh {
    private String secret;
    private long expiration;
  }
}
