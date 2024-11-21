package com.warehousepro.dto.response;

import java.util.List;

import com.warehousepro.dto.response.role.RoleRespone;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaginatedResponse<T> {
  List<T> items;
  Metadata metadata;


}
