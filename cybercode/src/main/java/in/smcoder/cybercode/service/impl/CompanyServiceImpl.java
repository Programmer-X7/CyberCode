package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.Company;
import in.smcoder.cybercode.repository.CompanyRepository;
import in.smcoder.cybercode.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public void deleteCompany(Long id) {
        companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No company found with id: " + id));
        companyRepository.deleteById(id);
    }
}
