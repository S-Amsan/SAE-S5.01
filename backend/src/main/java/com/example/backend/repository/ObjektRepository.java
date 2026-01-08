package com.example.backend.repository;

import com.example.backend.model.Objekt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjektRepository extends JpaRepository<Objekt, Long> {}
