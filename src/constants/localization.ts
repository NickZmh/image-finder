export const LOCALIZATION = {
  enterYourDetails: 'Enter Your Details',
  findImageButton: 'Find Image',
  chooseImage: 'Choose an Image',
  accept: 'Accept',
  reject: 'Reject',
  goBack: 'Go Back',
  confirmationTitle: 'Confirmation',
  errorFetchingImage: 'Failed to load the image. Please try again.',
  imageNotFound:
    'Oops, it looks like the image wasn’t found. Please return to the home page, fill out the form, and try again.',
  tryAgain: 'Try Again',
  goToForm: 'Go to Form',
} as const

export type LocalizationType = typeof LOCALIZATION
