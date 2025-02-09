import React, { act } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { ImageViewer } from '../ImageViewer'
import userEvent from '@testing-library/user-event'
import { initialUserData, useAppContext } from '../../../context'
import * as hooks from '../../../hooks'
import { LOCALIZATION } from '../../../constants'

import { renderWithProvider } from '../../../mocks/renderWithProvider'

jest.mock('../../../hooks', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../../hooks'),
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ImageViewer Component', () => {
  const mockFetchImage = jest.fn()
  const imageUrl: string = 'https://example.com/image.jpg'
  let category: string = ''

  const mockUseFetchImageData = {
    imageUrl: null,
    isLoading: false,
    error: null,
    fetchImage: mockFetchImage,
  }

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('should render corectly', () => {
    renderWithProvider(<ImageViewer />)

    expect(screen.getByText(LOCALIZATION.goBack)).toBeInTheDocument()
    expect(screen.getByText(LOCALIZATION.chooseImage)).toBeInTheDocument()
    expect(screen.getByText(LOCALIZATION.accept)).toBeInTheDocument()
    expect(screen.getByText(LOCALIZATION.reject)).toBeInTheDocument()
  })

  test('should disable Accept and Reject buttons when userData.imageUrl is empty', () => {
    renderWithProvider(<ImageViewer />, { initialUserData })

    const acceptButton = screen.getByRole('button', {
      name: LOCALIZATION.accept,
    })
    const rejectButton = screen.getByRole('button', {
      name: LOCALIZATION.reject,
    })

    expect(acceptButton).toBeDisabled()
    expect(rejectButton).toBeDisabled()
  })

  test('should show loader while image is loading', () => {
    jest.spyOn(hooks, 'useFetchImage').mockImplementationOnce(() => ({
      ...mockUseFetchImageData,
      isLoading: true,
    }))

    renderWithProvider(<ImageViewer />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('should hide loader when image is loaded', () => {
    jest.spyOn(hooks, 'useFetchImage').mockImplementationOnce(() => ({
      ...mockUseFetchImageData,
      isLoading: false,
    }))

    renderWithProvider(<ImageViewer />)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  test('should call the fetchImage callback with the correct parameter when userData.imageUrl is not empty and the "Reject" button is clicked', async () => {
    jest.spyOn(hooks, 'useFetchImage').mockImplementationOnce(() => ({
      ...mockUseFetchImageData,
      error: '',
    }))

    category = 'animals'

    renderWithProvider(<ImageViewer />, {
      initialUserData: {
        ...initialUserData,
        category,
        imageUrl: 'https://example.com/new-image.jpg',
      },
    })
    await userEvent.click(screen.getByText(LOCALIZATION.reject))

    waitFor(() => {
      expect(mockUseFetchImageData.fetchImage).toHaveBeenCalledWith(category)
    })
  })

  test('should call setUserData, navigate to "/confirm", and update the image with the new fetch response when the "Accept" button is clicked', async () => {
    const navigateMock = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigateMock)

    const updatedImageUrl: string = 'https://example.com/new-image.jpg'

    global.fetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          urls: { regular: updatedImageUrl },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    renderWithProvider(<ImageViewer />, {
      initialUserData: {
        ...initialUserData,
        category: 'nature',
        imageUrl,
      },
    })

    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl)

    const acceptButton = await screen.findByText(LOCALIZATION.accept)

    await act(async () => {
      await userEvent.click(acceptButton)
    })

    screen.debug()

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/confirm')
      expect(screen.getByRole('img')).toHaveAttribute('src', updatedImageUrl)
    })
  })

  test('should display FetchError and call fetchImage callback with correct parameter if click Try Again button', async () => {
    jest.spyOn(hooks, 'useFetchImage').mockImplementationOnce(() => ({
      ...mockUseFetchImageData,
      error: LOCALIZATION.errorFetchingImage,
    }))

    category = 'animals'

    renderWithProvider(<ImageViewer />, {
      initialUserData: {
        ...initialUserData,
        category,
      },
    })

    const retryButton = await screen.findByText(LOCALIZATION.tryAgain)

    await act(async () => {
      await userEvent.click(retryButton)
    })

    await waitFor(() => {
      expect(screen.getByText(LOCALIZATION.tryAgain)).toBeInTheDocument(),
        expect(mockUseFetchImageData.fetchImage).toHaveBeenCalledWith(category)
    })
  })

  test('should show Image "Not Found Message" and button "Go to Form" if userData.imageUrl and imageUrl is empty', async () => {
    jest.spyOn(hooks, 'useFetchImage').mockImplementationOnce(() => ({
      ...mockUseFetchImageData,
    }))

    renderWithProvider(<ImageViewer />, {
      initialUserData: {
        ...initialUserData,
        category: '',
      },
    })

    expect(screen.getByText(LOCALIZATION.imageNotFound)).toBeInTheDocument()
    expect(screen.getByText(LOCALIZATION.goToForm)).toBeInTheDocument()
  })

  test('should call navigate callback function with correct parameter when "Go Back" button is clicked', () => {
    const navigateMock = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigateMock)

    render(
      <MemoryRouter>
        <ImageViewer />
      </MemoryRouter>,
    )

    const goBackButton = screen.getByText(LOCALIZATION.goBack)

    fireEvent.click(goBackButton)

    expect(navigateMock).toHaveBeenCalledWith(-1)
  })

  test('should display image when API responds successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          urls: { regular: imageUrl },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    renderWithProvider(<ImageViewer />)

    await waitFor(() =>
      expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl),
    )
  })

  test('shows error message when API fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

    renderWithProvider(<ImageViewer />)

    await waitFor(() => {
      expect(screen.getByText(LOCALIZATION.tryAgain)).toBeInTheDocument()
      expect(screen.getByText(LOCALIZATION.goToForm)).toBeInTheDocument()
    })
  })
})
