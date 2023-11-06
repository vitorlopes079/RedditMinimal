import { render, screen } from '@testing-library/react';
import Loading from '../Loading'; 

describe("Loading", () => {
    it("renders the spinner when loading is true", () => {
        render(<Loading  loading={true}/>)
        const spinner = screen.getByRole('generic', { name: /Loading Spinner/i });
        expect(spinner).toBeInTheDocument()
    })

    it("not tender the spinner when the loading is false", () => {
        render(<Loading  loading={false}/>)
        const spinner = screen.queryByRole('generic', { name: /Loading Spinner/i });
        expect(spinner).not.toBeInTheDocument()
    })

})