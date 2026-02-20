@RestResource(urlMapping='/deepblue/trips/*')
global without sharing class TripResource {
    @HttpGet
    global static void doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        res.addHeader('Content-Type', 'application/json');

        String path = req.requestURI.substringAfter('/deepblue/trips');
        if (path == null) path = '';
        if (path.startsWith('/')) path = path.substring(1);

        String destinationParam = req.params.get('destination');

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
            } else if (String.isNotBlank(destinationParam)) {
                res.responseBody = Blob.valueOf(JSON.serialize(getByDestination(destinationParam)));
            } else {
                res.responseBody = Blob.valueOf(JSON.serialize(getAll()));
            }
        } catch (Exception e) {
            res.statusCode = 500;
            res.responseBody = Blob.valueOf('{"error":"' + e.getMessage() + '"}');
        }
    }

    private static String TRIP_FIELDS {
        get {
            return 'Slug__c, Name, Destination__r.Slug__c, Description__c, ' +
                   'Long_Description__c, Image_Path__c, Duration__c, Group_Size__c, ' +
                   'Price__c, Original_Price__c, Difficulty__c, Includes__c, ' +
                   'Schedule__c, Featured__c, Available_Dates__c';
        }
    }

    private static List<Map<String, Object>> getAll() {
        List<Trip__c> records = [
            SELECT Slug__c, Name, Destination__r.Slug__c, Description__c,
                   Long_Description__c, Image_Path__c, Duration__c, Group_Size__c,
                   Price__c, Original_Price__c, Difficulty__c, Includes__c,
                   Schedule__c, Featured__c, Available_Dates__c
            FROM Trip__c
            ORDER BY Name
        ];
        return mapList(records);
    }

    private static List<Map<String, Object>> getFeatured() {
        List<Trip__c> records = [
            SELECT Slug__c, Name, Destination__r.Slug__c, Description__c,
                   Long_Description__c, Image_Path__c, Duration__c, Group_Size__c,
                   Price__c, Original_Price__c, Difficulty__c, Includes__c,
                   Schedule__c, Featured__c, Available_Dates__c
            FROM Trip__c
            WHERE Featured__c = true
            ORDER BY Name
        ];
        return mapList(records);
    }

    private static Map<String, Object> getBySlug(String slug) {
        List<Trip__c> records = [
            SELECT Slug__c, Name, Destination__r.Slug__c, Description__c,
                   Long_Description__c, Image_Path__c, Duration__c, Group_Size__c,
                   Price__c, Original_Price__c, Difficulty__c, Includes__c,
                   Schedule__c, Featured__c, Available_Dates__c
            FROM Trip__c
            WHERE Slug__c = :slug
            LIMIT 1
        ];
        if (records.isEmpty()) return null;
        return mapRecord(records[0]);
    }

    private static List<Map<String, Object>> getByDestination(String destinationSlug) {
        List<Trip__c> records = [
            SELECT Slug__c, Name, Destination__r.Slug__c, Description__c,
                   Long_Description__c, Image_Path__c, Duration__c, Group_Size__c,
                   Price__c, Original_Price__c, Difficulty__c, Includes__c,
                   Schedule__c, Featured__c, Available_Dates__c
            FROM Trip__c
            WHERE Destination__r.Slug__c = :destinationSlug
            ORDER BY Name
        ];
        return mapList(records);
    }

    private static List<Map<String, Object>> mapList(List<Trip__c> records) {
        List<Map<String, Object>> result = new List<Map<String, Object>>();
        for (Trip__c r : records) {
            result.add(mapRecord(r));
        }
        return result;
    }

    private static Map<String, Object> mapRecord(Trip__c r) {
        Map<String, Object> m = new Map<String, Object>();
        m.put('slug', r.Slug__c);
        m.put('title', r.Name);
        m.put('destinationSlug', r.Destination__r != null ? r.Destination__r.Slug__c : '');
        m.put('description', r.Description__c);
        m.put('longDescription', r.Long_Description__c);
        m.put('imagePath', r.Image_Path__c);
        m.put('duration', r.Duration__c);
        m.put('groupSize', r.Group_Size__c);
        m.put('price', r.Price__c != null ? r.Price__c : 0);
        m.put('originalPrice', r.Original_Price__c);
        m.put('difficulty', r.Difficulty__c != null ? r.Difficulty__c.toLowerCase() : 'beginner');
        m.put('includes', parseJsonArray(r.Includes__c));
        m.put('schedule', parseJsonArray(r.Schedule__c));
        m.put('featured', r.Featured__c);
        m.put('availableDates', parseJsonArray(r.Available_Dates__c));
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
