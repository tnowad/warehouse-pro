package com.warehousepro.dto.response.warehouse;

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
    SortedBy sortedBy;
    Map<String, String> filterBy;
}
