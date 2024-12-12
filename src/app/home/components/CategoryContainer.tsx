import CategoryItem from './CategoryItem'

export default function CategoryContainer() {
  return (
    <div className="w-96 h-16 justify-start items-start gap-3 inline-flex">
      <CategoryItem label="신점" image="sinjeom" color="bg-red-600/10" />
      <CategoryItem label="신점" image="sinjeom" color="bg-red-600/10" />
      <CategoryItem label="신점" image="sinjeom" color="bg-red-600/10" />
      <CategoryItem label="신점" image="sinjeom" color="bg-red-600/10" />
    </div>
  )
}
