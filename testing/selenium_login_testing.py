from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Launch browser
driver = webdriver.Chrome()

# Open the CRM Dashboard login page
driver.get("http://localhost:3000/login")
driver.maximize_window()

# Enter credentials
driver.find_element(By.NAME, "email").send_keys("adithyak@gmail.com")
driver.find_element(By.NAME, "password").send_keys("Adithya@qq1")
driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

# Wait for dashboard to load
time.sleep(3)

# Check if dashboard loaded successfully
if "Dashboard" in driver.page_source:
    print("✅ Login Test Passed!")
else:
    print("❌ Login Test Failed!")

# Close browser
driver.quit()
