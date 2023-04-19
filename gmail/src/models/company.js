var Company = /** @class */ (function () {
    function Company() {}
    /**
     * Parse the dictionary returned by IAP.
     */
    Company.fromIapResponse = function (values) {
        var company = new Company();
        company.name = isTrue(values.name);
        company.email = first(values.email);
        company.phone = first(values.phone_numbers);
        company.isEnriched = !!Object.keys(values).length;
        company.emails = isTrue(values.email) ? values.email.join("\n") : null;
        company.phones = isTrue(values.phone_numbers) ? values.phone_numbers.join("\n") : null;
        company.image = isTrue(values.logo);
        company.website = formatUrl(values.domain);
        company.description = isTrue(values.description);
        company.address = isTrue(values.location);
        // Social Medias
        company.facebook = isTrue(values.facebook);
        company.twitter = isTrue(values.twitter);
        company.linkedin = isTrue(values.linkedin);
        company.crunchbase = isTrue(values.crunchbase);
        // Additional Information
        company.employees = values.employees || null;
        company.annualRevenue = isTrue(values.estimated_annual_revenue);
        company.industry = isTrue(values.industry);
        company.twitterBio = isTrue(values.twitter_bio);
        company.twitterFollowers = values.twitter_followers || null;
        company.foundedYear = values.founded_year;
        company.timezone = isTrue(values.timezone);
        company.timezoneUrl = isTrue(values.timezone_url);
        company.tags = isTrue(values.tag) ? values.tag.join(", ") : null;
        company.companyType = isTrue(values.company_type);
        return company;
    };
    /**
     * Unserialize the company object (reverse JSON.stringify).
     */
    Company.fromJson = function (values) {
        var company = new Company();
        company.id = values.id;
        company.name = values.name;
        company.email = values.email;
        company.phone = values.phone;
        company.address = values.address;
        company.annualRevenue = values.annualRevenue;
        company.companyType = values.companyType;
        company.description = values.description;
        company.emails = values.emails;
        company.employees = values.employees;
        company.foundedYear = values.foundedYear;
        company.image = values.image;
        company.industry = values.industry;
        company.mobile = values.mobile;
        company.phones = values.phones;
        company.tags = values.tags;
        company.timezone = values.timezone;
        company.timezoneUrl = values.timezoneUrl;
        company.twitterBio = values.twitterBio;
        company.twitterFollowers = values.twitterFollowers;
        company.website = values.website;
        company.crunchbase = values.crunchbase;
        company.facebook = values.facebook;
        company.twitter = values.twitter;
        company.linkedin = values.linkedin;
        return company;
    };
    /**
     * Parse the dictionary returned by an Odoo database.
     */
    Company.fromOdooResponse = function (values) {
        if (!values.id || values.id < 0) {
            return null;
        }
        var iapInfo = values.additionalInfo || {};
        var company = this.fromIapResponse(iapInfo);
        // Overwrite IAP information with the Odoo client database information
        company.id = values.id;
        company.name = values.name;
        company.email = values.email;
        company.phone = values.phone;
        company.mobile = values.mobile;
        company.website = values.website;
        company.image = values.image ? "data:image/png;base64," + values.image : null;
        if (values.address) {
            company.address = "";
            if (isTrue(values.address.street)) {
                company.address += values.address.street + ", ";
            }
            if (isTrue(values.address.zip)) {
                company.address += values.address.zip + " ";
            }
            if (isTrue(values.address.city)) {
                company.address += values.address.city + " ";
            }
            if (isTrue(values.address.country)) {
                company.address += values.address.country;
            }
        }
        return company;
    };
    return Company;
})();
