Here's a concise **README.md** for your project:  

---

# **Number Classification API**  

A simple API that classifies a number and provides interesting mathematical properties along with a fun fact.  

## **Features**  
- Checks if a number is **prime** or **perfect**  
- Determines if the number is **even** or **odd**  
- Identifies **Armstrong numbers**  
- Computes the **sum of digits**  
- Fetches a random fun fact from [Numbers API](http://numbersapi.com/) (`math`, `trivia`, or `date`)  

## **API Endpoint**  
### **Classify a Number**  
**GET** `/api/classify-number?number={value}`  

#### **Example Request:**  
```http
GET http://your-domain.com/api/classify-number?number=371
```

#### **Example Response (200 OK):**  
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### **Error Response (400 Bad Request):**  
```json
{
    "number": "abc",
    "error": true
}
```

## **Setup & Installation**  
1. Clone the repository  
   ```bash
   git clone https://github.com/hertheyhermee/number-classification-api.git
   cd number-classification-api
   ```
2. Install dependencies  
   ```bash
   npm install
   ```
3. Start the server  
   ```bash
   npm start
   ```

## **Deployment**  
**Render**.  

## **License**  
MIT License  

---