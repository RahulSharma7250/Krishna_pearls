import ProductDetail from './ProductDetail'

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  return <ProductDetail id={params.id} />
}
