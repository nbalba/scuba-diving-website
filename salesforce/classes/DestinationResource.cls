@RestResource(urlMapping='/deepblue/destinations/*')
global without sharing class DestinationResource {
    @HttpGet
    global static void doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        res.addHeader('Content-Type', 'application/json');

        String path = req.requestURI.substringAfter('/deepblue/destinations');
        if (path == null) path = '';
        if (path.startsWith('/')) path = path.substring(1);

        try {
            if (path == 'featured') {
                res.responseBody = Blob.valueOf(JSON.serialize(getFeatured()));
            } else if (String.isNotBlank(path)) {
                Object result = getBySlug(path);
                if (result == null) {
                    res.statusCode = 404;
                    res.responseBody = Blob.valueOf('{"error":"Not found"}');
                } else {
                    res.responseBody = Blob.valueOf(JSON.serialize(result));
                }
            } else {
                res.responseBody = Blob.valueOf(JSON.serialize(getAll()));
            }
        } catch (Exception e) {
            res.statusCode = 500;
            res.responseBody = Blob.valueOf('{"error":"' + e.getMessage() + '"}');
        }
    }

    private static List<Map<String, Object>> getAll() {
        List<Destination__c> records = [
            SELECT Slug__c, Name, Country__c, Region__c, Description__c,
                   Long_Description__c, Image_Path__c, Highlights__c,
                   Best_Season__c, Water_Temp__c, Visibility__c,
                   Max_Depth__c, Difficulty__c, Featured__c
            FROM Destination__c
            ORDER BY Name
        ];
        return mapList(records);
    }

    private static List<Map<String, Object>> getFeatured() {
        List<Destination__c> records = [
            SELECT Slug__c, Name, Country__c, Region__c, Description__c,
                   Long_Description__c, Image_Path__c, Highlights__c,
                   Best_Season__c, Water_Temp__c, Visibility__c,
                   Max_Depth__c, Difficulty__c, Featured__c
            FROM Destination__c
            WHERE Featured__c = true
            ORDER BY Name
        ];
        return mapList(records);
    }

    private static Map<String, Object> getBySlug(String slug) {
        List<Destination__c> records = [
            SELECT Slug__c, Name, Country__c, Region__c, Description__c,
                   Long_Description__c, Image_Path__c, Highlights__c,
                   Best_Season__c, Water_Temp__c, Visibility__c,
                   Max_Depth__c, Difficulty__c, Featured__c
            FROM Destination__c
            WHERE Slug__c = :slug
            LIMIT 1
        ];
        if (records.isEmpty()) return null;
        return mapRecord(records[0]);
    }

    private static List<Map<String, Object>> mapList(List<Destination__c> records) {
        List<Map<String, Object>> result = new List<Map<String, Object>>();
        for (Destination__c r : records) {
            result.add(mapRecord(r));
        }
        return result;
    }

    private static Map<String, Object> mapRecord(Destination__c r) {
        Map<String, Object> m = new Map<String, Object>();
        m.put('slug', r.Slug__c);
        m.put('name', r.Name);
        m.put('country', r.Country__c);
        m.put('region', r.Region__c);
        m.put('description', r.Description__c);
        m.put('longDescription', r.Long_Description__c);
        m.put('imagePath', r.Image_Path__c);
        m.put('highlights', parseJsonArray(r.Highlights__c));
        m.put('bestSeason', r.Best_Season__c);
        m.put('waterTemp', r.Water_Temp__c);
        m.put('visibility', r.Visibility__c);
        m.put('maxDepth', r.Max_Depth__c);
        m.put('difficulty', r.Difficulty__c != null ? r.Difficulty__c.toLowerCase() : 'beginner');
        m.put('featured', r.Featured__c);
        return m;
    }

    private static List<Object> parseJsonArray(String value) {
        if (String.isBlank(value)) return new List<Object>();
        try {
            return (List<Object>) JSON.deserializeUntyped(value);
        } catch (Exception e) {
            return new List<Object>();
        }
    }
}
