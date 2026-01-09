package com.example.backend.controller;

import com.example.backend.model.Report;
import com.example.backend.repository.ReportRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/all")
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}
