import cv2
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.audio.io.AudioFileClip import AudioFileClip
from moviepy import CompositeVideoClip
from pathlib import Path

def create_video_from_images(image_folder: str, output_video_path: str, fps: int = 24):
    """
    Creates a video from a folder of images.

    :param image_folder: Path to the folder containing images.
    :param output_video_path: Path to save the output video file.
    :param fps: Frames per second for the video.
    :return: Path to the created video file.
    """
    # Get a sorted list of images
    image_files = sorted(Path(image_folder).glob("*.png")) + sorted(Path(image_folder).glob("*.jpg"))
    print(f"Found {len(image_files)} images")
    if not image_files:
        raise ValueError("No image files found in the folder.")

    # Read the first image to determine dimensions
    first_image = cv2.imread(str(image_files[0]))
    if first_image is None:
        raise ValueError(f"Failed to read image: {image_files[0]}")
    height, width, _ = first_image.shape

    fourcc = cv2.VideoWriter.fourcc(*'XVID')  # Corrected FOURCC call
    video_writer = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

    # Process each image
    for image_file in image_files:
        image = cv2.imread(str(image_file))
        if image is None:
            print(f"Failed to read image: {image_file}")
            continue
        if image.shape[:2] != (height, width):
            image = cv2.resize(image, (width, height))
        video_writer.write(image)
        print(f"Added image {image_file} to video")

    video_writer.release()
    print(f"Video created successfully at {output_video_path}")

def add_music_to_video(video_path: str, audio_path: str, output_path: str):
    """
    Adds music to a video file.

    :param video_path: Path to the video file.
    :param audio_path: Path to the audio file.
    :param output_path: Path to save the output video with music.
    """
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)
    video_with_audio = CompositeVideoClip([video_clip.with_audio(audio_clip)])
    video_with_audio.write_videofile(output_path, codec="libx264", audio_codec="aac")
    print(f"Video with music saved at {output_path}")

def main():
    """
    Main function to create video from images and add music to it.
    """
    image_folder = "./images"  # Replace with your image folder
    temp_video_path = "temp_video.mp4"  # Temporary video file
    final_video_path = "final_video_with_music.mp4"  # Final video with music
    audio_file_path = "./audio/audio_1.mp3"  # Replace with your audio file

    # Create the video from images
    try:
        create_video_from_images(image_folder, temp_video_path, fps=1)
        # Add music to the video
        add_music_to_video(temp_video_path, audio_file_path, final_video_path)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
