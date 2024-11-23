import base64
import json

def encode_image_to_json(image_path: str, json_output_path: str):
    """
    Encodes an image file to Base64 and saves it as a JSON file suitable for Swagger.

    :param image_path: Path to the image file to encode.
    :param json_output_path: Path to the JSON file to save the encoded image.
    """
    try:
        # Read the image in binary mode
        with open(image_path, 'rb') as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        # Prepare the JSON structure
        json_data = {
            "image_data": encoded_string
        }

        # Write the JSON to the output file
        with open(json_output_path, 'w', encoding='utf-8') as json_file:
            json.dump(json_data, json_file, indent=4)

        print(f"Image successfully encoded to JSON: {json_output_path}")

    except FileNotFoundError:
        print(f"Error: File '{image_path}' not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# Example usage
if __name__ == "__main__":
    input_image_path = "example.png"  # Replace with your image file path
    output_json_path = "swagger_image.json"  # Replace with desired output JSON file path
    encode_image_to_json(input_image_path, output_json_path)
