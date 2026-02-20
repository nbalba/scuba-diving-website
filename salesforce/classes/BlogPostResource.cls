@RestResource(urlMapping='/deepblue/blog-posts/*')
global without sharing class BlogPostResource {
    @HttpGet
    global static void doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        res.addHeader('Content-Type', 'application/json');

        String path = req.requestURI.substringAfter('/deepblue/blog-posts');
        if (path == null) path = '';
        if (path.startsWith('/')) path = path.substring(1);

        try {
            if (String.isNotBlank(path)) {
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
        List<Blog_Post__c> records = [
            SELECT Slug__c, Name, Excerpt__c, Content__c, Image_Path__c,
                   Author__c, Published_At__c, Tags__c
            FROM Blog_Post__c
            ORDER BY Published_At__c DESC
        ];
        return mapList(records);
    }

    private static Map<String, Object> getBySlug(String slug) {
        List<Blog_Post__c> records = [
            SELECT Slug__c, Name, Excerpt__c, Content__c, Image_Path__c,
                   Author__c, Published_At__c, Tags__c
            FROM Blog_Post__c
            WHERE Slug__c = :slug
            LIMIT 1
        ];
        if (records.isEmpty()) return null;
        return mapRecord(records[0]);
    }

    private static List<Map<String, Object>> mapList(List<Blog_Post__c> records) {
        List<Map<String, Object>> result = new List<Map<String, Object>>();
        for (Blog_Post__c r : records) {
            result.add(mapRecord(r));
        }
        return result;
    }

    private static Map<String, Object> mapRecord(Blog_Post__c r) {
        Map<String, Object> m = new Map<String, Object>();
        m.put('slug', r.Slug__c);
        m.put('title', r.Name);
        m.put('excerpt', r.Excerpt__c);
        m.put('content', r.Content__c);
        m.put('imagePath', r.Image_Path__c);
        m.put('author', r.Author__c);
        m.put('publishedAt', r.Published_At__c != null ? String.valueOf(r.Published_At__c) : '');
        m.put('tags', parseJsonArray(r.Tags__c));
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
