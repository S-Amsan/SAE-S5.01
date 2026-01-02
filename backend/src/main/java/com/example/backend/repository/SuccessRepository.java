package com.example.backend.repository;

import com.example.backend.model.Success;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuccessRepository extends JpaRepository<Success, Long> {}
