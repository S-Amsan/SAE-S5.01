package com.example.backend.service;

import com.example.backend.model.donation.Donation;
import com.example.backend.model.http.req.DonationPublishRequest;
import com.example.backend.model.http.res.FileUploadResponse;
import com.example.backend.model.partner.Partner;
import com.example.backend.repository.DonationRepository;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private PartnerService partnerService;

    @Autowired
    private FileUploadService fileUploadService;

    public List<Donation> getAll() {
        return donationRepository.findAll();
    }

    public Donation publish(DonationPublishRequest request) {
        Donation donation = new Donation();
        donation.setSlug(request.getSlug());
        donation.setTitle(request.getTitle());
        donation.setFullTitle(request.getFullTitle());
        donation.setDescription(request.getDescription());
        donation.setFullDescription(request.getFullDescription());
        donation.setPoints(request.getPoints());

        Partner partner = partnerService
            .getById(request.getPartnerId())
            .orElseThrow();
        donation.setPartner(partner);

        FileUploadResponse fileUploadResponse;

        try {
            fileUploadResponse = fileUploadService.upload(request.getImage());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload card photo", e);
        }

        donation.setImageUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                fileUploadResponse.getFilename()
        );

        try {
            fileUploadResponse = fileUploadService.upload(
                request.getCardImage()
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload card photo", e);
        }

        donation.setCardImageUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                fileUploadResponse.getFilename()
        );

        try {
            fileUploadResponse = fileUploadService.upload(
                request.getBannerImage()
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload banner photo", e);
        }

        donation.setBannerImageUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                fileUploadResponse.getFilename()
        );

        return donationRepository.save(donation);
    }
}
