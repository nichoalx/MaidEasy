with open("app/main.py", "rb") as f:
    data = f.read()
    if b'\x00' in data:
        print("File contains null bytes!")
    else:
        print("File is clean.")
