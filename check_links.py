import os
import re

import os
import re

project_dir = r"C:\Users\marya\Desktop\kurowabi"
html_files = [f for f in os.listdir(project_dir) if f.endswith(".html")]

missing_count = 0

for html_file in html_files:
    html_path = os.path.join(project_dir, html_file)
    print(f"\nVerifying references in {html_file}:")
    
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    links = re.findall(r'(?:href|src)="([^"#]+)"', content)
    
    for link in links:
        if link.startswith("http://") or link.startswith("https://"):
            print(f"  [EXTERNAL] {link}")
            continue
            
        if link.startswith("mailto:") or link.startswith("tel:"):
            print(f"  [PROTOCOL] {link}")
            continue
            
        link_path = link.lstrip("/")
        resolved_path = os.path.normpath(os.path.join(project_dir, link_path))
        
        if os.path.exists(resolved_path):
            print(f"  [OK] {link} -> {resolved_path}")
        else:
            print(f"  [MISSING] {link} -> {resolved_path}")
            missing_count += 1

if missing_count == 0:
    print("\nSUCCESS: All referenced assets across all pages verified and present!")
else:
    print(f"\nERROR: {missing_count} asset(s) are missing!")
    exit(1)
