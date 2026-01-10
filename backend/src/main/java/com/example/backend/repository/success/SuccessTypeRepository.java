package com.example.backend.repository.success;

import com.example.backend.model.success.SuccessType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuccessTypeRepository
    extends JpaRepository<SuccessType, Long> {}
