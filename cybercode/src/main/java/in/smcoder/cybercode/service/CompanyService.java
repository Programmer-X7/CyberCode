package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.Company;

import java.util.List;

public interface CompanyService {
    Company createCompany(Company company);

    List<Company> getAllCompanies();

    void deleteCompany(Long id);
}
