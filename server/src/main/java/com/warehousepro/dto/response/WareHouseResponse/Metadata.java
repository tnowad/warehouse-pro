package com.warehousepro.dto.response.WareHouseResponse;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Metadata {
    Pagination pagination;
    Map<Integer, String> etags;
    List<String> sortedBy;
    List<String> warnings;
    Map<String, Object> custom;
}
