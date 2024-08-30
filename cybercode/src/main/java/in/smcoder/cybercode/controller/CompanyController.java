package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.entity.Company;
import in.smcoder.cybercode.entity.Tag;
import in.smcoder.cybercode.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/create")
    public ResponseEntity<Company> createCompany(Company company) {
        Company savedCompany = companyService.createCompany(company);
        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long companyId) {
        companyService.deleteCompany(companyId);
        return ResponseEntity.noContent().build();
    }

}
