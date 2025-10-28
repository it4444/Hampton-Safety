#!/usr/bin/env python3
"""
Debug script to investigate description HTML structure
"""

import requests
from bs4 import BeautifulSoup

ADMIN_URL = 'https://videotilehost.com/hamptonsafety/adminWebsiteContent.php'

print("Fetching page...")
response = requests.get(ADMIN_URL)
soup = BeautifulSoup(response.content, 'lxml')

print("\n=== Looking for 'Abrasive Wheels' description ===\n")

# Search for "Abrasive Wheels" text
results = soup.find_all(string=lambda text: text and 'Abrasive Wheels' in text)

for i, result in enumerate(results[:10]):  # Show first 10 matches
    print(f"Match {i+1}:")
    print(f"  Text: {result[:100]}...")
    print(f"  Parent tag: {result.parent.name}")
    print(f"  Parent attrs: {result.parent.attrs}")

    # Show next few siblings
    if result.parent:
        print(f"  Next siblings:")
        for j, sibling in enumerate(result.parent.find_next_siblings(limit=3)):
            print(f"    {j+1}. Tag: {sibling.name}, Attrs: {sibling.attrs if hasattr(sibling, 'attrs') else 'N/A'}")
            if hasattr(sibling, 'get_text'):
                text = sibling.get_text(strip=True)[:80]
                print(f"       Text: {text}...")
    print()

print("\n=== Detailed look at Abrasive Wheels textarea ===\n")
# Find the "Abrasive Wheels:" strong tag
for strong in soup.find_all('strong'):
    if 'Abrasive Wheels:' in strong.get_text():
        print(f"Found strong tag: {strong.get_text(strip=True)}")

        # Get next textarea sibling
        for sibling in strong.find_next_siblings(limit=3):
            print(f"Next sibling: tag={sibling.name}, class={sibling.get('class', 'N/A')}")
            if sibling.name == 'textarea':
                print(f"  Textarea attributes: {sibling.attrs}")
                text = sibling.string
                print(f"  Using .string: {text[:200] if text else 'None'}...")
                text2 = sibling.get_text()
                print(f"  Using .get_text(): {text2[:200] if text2 else 'None'}...")
                # Try to get raw content
                print(f"  Textarea contents (raw): {list(sibling.children)[:1]}")
                break
        break

print("\n=== All textarea elements ===\n")
textareas = soup.find_all('textarea')
print(f"Found {len(textareas)} textarea elements")
for i, ta in enumerate(textareas[:10]):
    text = ta.string or ta.get_text(strip=True)
    name = ta.get('name', 'N/A')
    id_attr = ta.get('id', 'N/A')

    # Check preceding sibling for label
    prev = ta.find_previous_sibling()
    prev_text = prev.get_text(strip=True) if prev and hasattr(prev, 'get_text') else 'N/A'

    print(f"{i+1}. Name: {name}, ID: {id_attr}")
    print(f"   Previous sibling text: {prev_text[:60]}...")
    if text:
        print(f"   Content length: {len(text)} chars")
        print(f"   Content: {text[:150]}...")
    else:
        print(f"   Content: EMPTY")
    print()

print("\n=== All input elements with type=text ===\n")
text_inputs = soup.find_all('input', {'type': 'text'})
print(f"Found {len(text_inputs)} text input elements")
for i, inp in enumerate(text_inputs[:5]):
    print(f"{i+1}. Value: {inp.get('value', 'N/A')[:100]}...")
    print()
