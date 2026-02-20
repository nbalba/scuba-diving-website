@RestResource(urlMapping='/deepblue/testimonials/*')
global without sharing class TestimonialResource {
    @HttpGet
    global static void doGet() {
        RestResponse res = RestContext.response;
        res.addHeader('Content-Type', 'application/json');

        try {
            res.responseBody = Blob.valueOf(JSON.serialize(getAll()));
        } catch (Exception e) {
            res.statusCode = 500;
            res.responseBody = Blob.valueOf('{"error":"' + e.getMessage() + '"}');
        }
    }

    private static List<Map<String, Object>> getAll() {
        List<Testimonial__c> records = [
            SELECT Name, Location__c, Quote__c, Rating__c, Trip__r.Slug__c
            FROM Testimonial__c
            ORDER BY CreatedDate DESC
        ];

        List<Map<String, Object>> result = new List<Map<String, Object>>();
        for (Testimonial__c r : records) {
            Map<String, Object> m = new Map<String, Object>();
            m.put('name', r.Name);
            m.put('location', r.Location__c);
            m.put('quote', r.Quote__c);
            m.put('rating', r.Rating__c != null ? r.Rating__c : 5);
            m.put('tripSlug', r.Trip__r != null ? r.Trip__r.Slug__c : null);
            result.add(m);
        }
        return result;
    }
}
